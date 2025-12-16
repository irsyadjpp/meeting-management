import { SlideDeckManager } from '@/components/meeting/slide-deck-manager';
import { meetings } from '@/lib/data';

// Ini akan menjadi Server Component yang mengambil data awal
export default function EditSlidesPage({ params }: { params: { id: string } }) {
  // Simulasi fetch data slide berdasarkan meeting ID
  // Di real app, Anda akan fetch dari database
  const meeting = meetings.find(m => m.id === params.id);

  // Jika Anda ingin menggunakan layout khusus tanpa Sidebar untuk halaman ini, 
  // Anda bisa mengatur Layout di level folder ini.
  // Tapi di sini kita render langsung Manager-nya.

  return (
    <div className="h-full w-full overflow-hidden">
        <SlideDeckManager meetingId={params.id} initialSlides={meeting?.slides}/>
    </div>
  );
}
