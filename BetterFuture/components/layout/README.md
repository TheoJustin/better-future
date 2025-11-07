# Global Layout Components

Komponen layout global yang dapat digunakan kembali untuk semua halaman dengan dimensi iPhone 16 Plus (430x932px).

## Komponen

### 1. GlobalLayout
Layout utama dengan struktur konsisten untuk semua halaman.

**Props:**
- `children`: Konten halaman
- `header?`: Konfigurasi header
  - `title?`: Judul halaman
  - `showBack?`: Tampilkan tombol back (default: true)
  - `showMenu?`: Tampilkan tombol menu (default: true)
  - `onBack?`: Custom handler untuk tombol back
  - `onMenuClick?`: Custom handler untuk tombol menu
- `bottomNav?`: Konten untuk bottom navigation
- `className?`: Custom class untuk container
- `contentClassName?`: Custom class untuk content area

### 2. PageWrapper
Wrapper untuk memberikan background dan centering pada halaman.

**Props:**
- `children`: Konten yang akan di-wrap
- `className?`: Custom class tambahan

### 3. ProtectedPage
Wrapper yang menggabungkan PageWrapper dan GlobalLayout dengan autentikasi check.

**Props:**
- Semua props dari `GlobalLayout`
- `requireAuth?`: Apakah halaman memerlukan autentikasi (default: true)
- `redirectTo?`: Route untuk redirect jika tidak terautentikasi (default: '/login')

## Dimensi

- **Width**: 430px (iPhone 16 Plus)
- **Height**: 932px (iPhone 16 Plus)
- **Border Radius**: 55px

## Contoh Penggunaan

### Halaman dengan Header
```tsx
import { ProtectedPage } from '@/components/layout'

export default function MyPage() {
  return (
    <ProtectedPage
      header={{
        title: 'Judul Halaman',
        showBack: true,
        showMenu: true,
      }}
    >
      <div className="p-4">
        <h1>Konten Halaman</h1>
      </div>
    </ProtectedPage>
  )
}
```

### Halaman dengan Bottom Navigation
```tsx
import { ProtectedPage } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function PageWithNav() {
  return (
    <ProtectedPage
      header={{ title: 'Halaman dengan Nav' }}
      bottomNav={
        <div className="flex items-center justify-center h-full">
          <Button>Tombol Aksi</Button>
        </div>
      }
    >
      <div className="p-4">
        <p>Konten halaman</p>
      </div>
    </ProtectedPage>
  )
}
```

### Halaman Publik (Tanpa Autentikasi)
```tsx
import { GlobalLayout, PageWrapper } from '@/components/layout'

export default function PublicPage() {
  return (
    <PageWrapper>
      <GlobalLayout header={{ title: 'Halaman Publik' }}>
        <div className="p-4">
          <p>Konten halaman publik</p>
        </div>
      </GlobalLayout>
    </PageWrapper>
  )
}
```

### Halaman dengan Custom Handler
```tsx
import { ProtectedPage } from '@/components/layout'
import { useRouter } from 'next/navigation'

export default function CustomPage() {
  const router = useRouter()

  return (
    <ProtectedPage
      header={{
        title: 'Custom Handler',
        onBack: () => router.push('/custom-route'),
        onMenuClick: () => console.log('Menu clicked'),
      }}
    >
      <div className="p-4">
        <p>Halaman dengan custom handler</p>
      </div>
    </ProtectedPage>
  )
}
```

## Struktur Layout

```
┌─────────────────────────────┐
│   Floating Island (top)     │
├─────────────────────────────┤
│   Header (optional)         │
│   [Back] Title [Menu]       │
├─────────────────────────────┤
│                             │
│   Content Area              │
│   (scrollable)              │
│                             │
├─────────────────────────────┤
│   Bottom Nav (optional)     │
├─────────────────────────────┤
│   Control Bar (bottom)      │
└─────────────────────────────┘
```

## Fitur

- ✅ Dimensi iPhone 16 Plus (430x932px)
- ✅ Header dengan back button dan menu
- ✅ Bottom navigation support
- ✅ Autentikasi check otomatis
- ✅ Custom handlers untuk navigation
- ✅ Responsive content area dengan scroll
- ✅ Konsisten dengan design system

