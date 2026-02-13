import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export default function Page() {
  return (
    <div className="h-screen flex items-start justify-center py-0 px-0">
      <div className="w-full max-w-7xl mx-6 bg-blue-50 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm min-h-[480px] md:min-h-[600px]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-7/12 p-4 md:p-6 flex items-center justify-center">
            <div className="w-full h-full rounded-tr-2xl rounded-br-2xl md:rounded-l-2xl md:rounded-r-none overflow-hidden flex items-center justify-center">
              <img
                src="/images/forgetpassword.png"
                alt="forget password illustration"
                className="w-full max-w-lg h-80 md:h-[520px] object-contain"
              />
            </div>
          </div>

          <div className="w-full md:w-5/12 p-4 md:p-6 flex items-center">
            <div className="w-full">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
