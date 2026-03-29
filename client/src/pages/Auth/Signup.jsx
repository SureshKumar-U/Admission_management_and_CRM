import { Link } from "react-router-dom";

const SigUpPage = ()=> {


  return (
    <div className="min-h-screen flex items-center justify-center">
    <div class="bg-[#141720] border border-[#252a3a] rounded-lg p-9 w-95">
        <div  className="text-2xl mb-4">🎓</div>
        <div className="text-xl font-semibold mb-1 ">EduMerge CRM</div>
        <div className="text-[#555d7a] text-sm mb-7">Admission Management System</div>
        <div className="flex flex-col gap-1.5" style={{ marginBottom: 20 }}>
          <label className="text-sm">Enter Your Email</label>
          <input className="p-1 border border-[#252a3a]  focus:border-gray-500 focus:outline-none focus:ring-0 rounded-sm"/>
        </div>
            <div className="flex flex-col gap-1.5" style={{ marginBottom: 20 }}>
          <label className="text-sm">Enter Your Password</label>
          <input className="p-1 border border-[#252a3a]  focus:border-gray-500 focus:outline-none focus:ring-0 rounded-sm"/>
        </div>
        <button className="cursor-pointer bg-[#4f8ef7] text-center px-1.5 py-2 font-medium border rounded-md w-full text-white border-none" >
          Sign In →
        </button>
      <div className="mt-4 text-center text-sm">Already have an account?  <Link className="text-[#4f8ef7]" to={"/signIn"} > SignIn  </Link></div>
      </div>
    </div>
  );
}


export default SigUpPage