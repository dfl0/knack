import NavBar from '@/app/components/navbar';

export default function MainLayout({ children }) {
  return (
    <>
        <NavBar />
        <div className='pt-14'>{children}</div>
    </>
  );
}