import AddListing from "@components/addlisting"
import Preview from "@components/preview"

export default function Knacks() {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-16 px-20 pt-6 ">
      <AddListing />
      <Preview
        photo="/images/img1.png"
        username="dflocos1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        price="25"
      />
      <Preview
        photo="/images/img2.png"
        username="jhannag1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        price="25"
      />
      <Preview
        photo="/images/img3.png"
        username="mbronic1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        price="25"
      />
      <Preview
        photo="/images/img4.png"
        username="username"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        price="25"
      />
      <Preview
        photo="/images/img5.png"
        username="another1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        price="25"
      />
    </div>
  )
}
