---
name: update-office-page
description: Update the Nero Network office WordPress page using Kovcheg blob tools. Use when editing office page HTML, publishing drafts, or syncing large page content.
---

# Update Nero Network office page

## When to use

- Editing the office / contacts / network landing page in WordPress
- Uploading large HTML (use blob flow, not inline `content` in tool args)
- Publishing or saving drafts after content review

## Workflow

1. Confirm the target `page_id` with the user if unknown.
2. Build or receive the final HTML.
3. Upload via Kovcheg:
   - `wordpress_content_blob_append` — chunks ≤ 20 000 characters; reuse `blob_id` until done
   - Last chunk: `finalize: true`
4. Apply: `wordpress_update_page_from_blob` with `page_id` and `blob_id`.
5. Optionally set `title`, `status`, `slug`, or `featured_media` on the update call.

## Rules

- Do not pass full page HTML directly in `wordpress_update_page_from_blob` arguments; always use the blob pipeline for large content.
- Prefer `draft` until the user confirms publish.
- Preserve existing shortcodes, forms, and tracking snippets unless asked to remove them.
