/**
 * Google Reviews Import Script
 *
 * Reads ~/projects/johnson-reviews/reviews-final.json and upserts
 * all reviews into the Payload CMS reviews collection.
 *
 * Usage:
 *   cd apps/app
 *   DATABASE_URL=<url> PAYLOAD_SECRET=<secret> tsx scripts/import-reviews.ts
 *
 * Options:
 *   --dry-run   Print what would be imported without making changes
 */

import 'dotenv/config'
import os from 'os'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import slugify from 'slugify'
import config from '../src/payload.config'

const DRY_RUN = process.argv.includes('--dry-run')

interface RawReview {
  reviewId: string
  businessName: string
  address?: string
  rating: string
  date?: string
  text?: string
  allPhotoUrls?: string[]
  totalPhotoCount?: number
}

function makeSlug(name: string, index: number): string {
  const base = slugify(name, { lower: true, strict: true })
  return index === 0 ? base : `${base}-${index}`
}

async function importReviews() {
  console.log(`📥 Google Reviews Import${DRY_RUN ? ' (DRY RUN)' : ''}\n`)

  const jsonPath = path.join(os.homedir(), 'projects', 'johnson-reviews', 'reviews-final.json')

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File not found: ${jsonPath}`)
    process.exit(1)
  }

  const raw = fs.readFileSync(jsonPath, 'utf-8')
  const reviews: RawReview[] = JSON.parse(raw)
  console.log(`📊 Loaded ${reviews.length} reviews from JSON\n`)

  if (DRY_RUN) {
    console.log('🔍 DRY RUN — no changes will be made')
    console.log(`Would import ${reviews.length} reviews`)
    process.exit(0)
  }

  const payload = await getPayload({ config })

  // Build a slug uniqueness map
  const slugCounts: Record<string, number> = {}

  let created = 0
  let updated = 0
  let errors = 0

  for (let i = 0; i < reviews.length; i++) {
    const raw = reviews[i]

    // Generate a unique slug
    const baseSlug = slugify(raw.businessName, { lower: true, strict: true })
    const count = slugCounts[baseSlug] ?? 0
    const slug = count === 0 ? baseSlug : `${baseSlug}-${count}`
    slugCounts[baseSlug] = count + 1

    const rating = parseInt(raw.rating, 10)
    const photos = (raw.allPhotoUrls ?? []).map((url) => ({ url }))

    const data = {
      googleReviewId: raw.reviewId,
      businessName: raw.businessName,
      slug,
      address: raw.address ?? '',
      rating,
      reviewDate: raw.date ?? '',
      reviewText: raw.text ?? '',
      photos,
      totalPhotoCount: raw.totalPhotoCount ?? photos.length,
    }

    try {
      // Check if it already exists
      const existing = await payload.find({
        collection: 'reviews',
        where: { googleReviewId: { equals: raw.reviewId } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'reviews',
          id: existing.docs[0].id,
          data,
        })
        updated++
      } else {
        await payload.create({
          collection: 'reviews',
          data,
        })
        created++
      }
    } catch (err) {
      console.error(`  ✗ Error on review ${i + 1} (${raw.businessName}): ${(err as Error).message}`)
      errors++
    }

    // Log progress every 50 records
    if ((i + 1) % 50 === 0 || i + 1 === reviews.length) {
      console.log(`  [${i + 1}/${reviews.length}] created: ${created} | updated: ${updated} | errors: ${errors}`)
    }
  }

  console.log('\n' + '─'.repeat(60))
  console.log('✅ Import complete!')
  console.log(`   Created : ${created}`)
  console.log(`   Updated : ${updated}`)
  console.log(`   Errors  : ${errors}`)
  console.log('─'.repeat(60))

  process.exit(0)
}

importReviews().catch((err) => {
  console.error('💥 Fatal error:', err)
  process.exit(1)
})
