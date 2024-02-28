import AddListing from '@/app/components/addlisting';
import Preview from '@/app/components/preview';

export default function Knacks() {
  return (
    <div className='pt-6 px-20 flex items-stretch gap-16 justify-center flex-wrap '>
      <AddListing />
      <Preview photo="/images/img1.png" username="dflocos1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." price="25"/>
      <Preview photo="/images/img2.png" username="jhannag1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." price="25"/>
      <Preview photo="/images/img3.png" username="mbronic1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." price="25"/>
      <Preview photo="/images/img4.png" username="username" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." price="25"/>
    </div>
  );
}
