import NavBar from '@/app/components/navbar';

export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}