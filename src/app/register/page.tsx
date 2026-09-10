import { RegisterForm } from "@/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background py-24 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Create an Account</h1>
          <p className="text-muted-foreground">
            Sign up to track your styles and easily book your next appointment.
          </p>
        </div>
        <div className="bg-card rounded-[12px] border border-border p-6 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
