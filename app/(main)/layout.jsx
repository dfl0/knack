import NavBar from '@components/navbar';

export default function MainLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="w-full shrink-0">
        <NavBar />
      </div>
      <div className="w-full h-full overflow-scroll">{children}</div>
    </div>
  );
}
