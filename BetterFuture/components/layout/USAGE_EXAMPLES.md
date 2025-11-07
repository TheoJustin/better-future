/**
 * Contoh penggunaan GlobalLayout untuk halaman baru
 * 
 * Contoh 1: Halaman sederhana dengan header
 */
/*
'use client'

import { ProtectedPage } from '@/components/layout'

export default function ExamplePage() {
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
*/

/**
 * Contoh 2: Halaman dengan custom header dan bottom nav
 */
/*
'use client'

import { ProtectedPage } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function ExampleWithNavPage() {
  return (
    <ProtectedPage
      header={{
        title: 'Halaman dengan Nav',
        showBack: true,
      }}
      bottomNav={
        <div className="flex items-center justify-center h-full">
          <Button>Tombol Aksi</Button>
        </div>
      }
    >
      <div className="p-4">
        <p>Konten halaman dengan bottom navigation</p>
      </div>
    </ProtectedPage>
  )
}
*/

/**
 * Contoh 3: Halaman tanpa autentikasi
 */
/*
'use client'

import { GlobalLayout, PageWrapper } from '@/components/layout'

export default function PublicPage() {
  return (
    <PageWrapper>
      <GlobalLayout
        header={{
          title: 'Halaman Publik',
          showBack: true,
        }}
      >
        <div className="p-4">
          <p>Halaman yang tidak memerlukan autentikasi</p>
        </div>
      </GlobalLayout>
    </PageWrapper>
  )
}
*/

/**
 * Contoh 4: Halaman dengan custom handler
 */
/*
'use client'

import { ProtectedPage } from '@/components/layout'
import { useRouter } from 'next/navigation'

export default function CustomHandlerPage() {
  const router = useRouter()

  return (
    <ProtectedPage
      header={{
        title: 'Custom Handler',
        showBack: true,
        onBack: () => {
          // Custom back handler
          router.push('/custom-route')
        },
        onMenuClick: () => {
          // Custom menu handler
          console.log('Menu clicked')
        },
      }}
    >
      <div className="p-4">
        <p>Halaman dengan custom handler</p>
      </div>
    </ProtectedPage>
  )
}
*/

