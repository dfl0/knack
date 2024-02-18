import LikeButton from './like-button';

export default function Login() {
    
    return (
    <div>
        <div>
            <h1 className = 'h-[50px] bg-orange-900 font-bold text-gray-400 text-3xl'>KNACK/SIFT</h1>
        </div>

       <div className="p-5">  
            <div className="p-5 bg-red-100 border-[5px] border-black rounded-xl text-2xl">
                <h1>Log-In</h1>
            </div>

            <div className="p-1"> </div>

            <div className="space-x-20">  
                <LikeButton/>
            </div>    

            <div className="p-1"> </div>

            <div className="p-5 bg-blue-100 border-[5px] border-black rounded-xl text-2xl">
                <h1>Sign-In</h1>
            </div>

            <div className="h-0 w-0 border-b-[30px] border-l-[30px] border-r-[30px] border-b-black border-l-transparent border-r-transparent">
            </div>
        </div>
    </div>
    )
  }
  