# SVG Assets

Place site SVGs here. Files in this folder are served statically at `/svgs/*`.

Usage examples:

- HTML/JSX img:

```tsx
<img src="/svgs/summit-mark.svg" alt="Summit mark" width={64} height={64} />
```

- Next.js Image (SVGs are pass-through, no optimization):

```tsx
import Image from 'next/image'

<Image src="/svgs/summit-mark.svg" alt="Summit mark" width={64} height={64} />
```

Keep SVGs clean and minified. Prefer strokes/fills using the brand color `#0a1f44` when appropriate.

