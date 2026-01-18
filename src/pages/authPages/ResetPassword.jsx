import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";
import { resetPasswordByTokenAction } from "../../features/user/useraction";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsPending(true);
    try {
      const response = await dispatch(resetPasswordByTokenAction({ password }, token));
      if (response.status === "success") {
        toast.success(response.message || "Password reset successful!");
        navigate("/login");
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch (error) {
       console.error("Reset password error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1920&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-transparent" />

      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-5xl mx-auto backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 bg-white/80 md:bg-white/70 dark:bg-neutral-900/70 dark:border-neutral-800 transition-all">
        <div className="hidden md:flex flex-1 flex-col justify-center items-start px-10 py-14 bg-gradient-to-br from-blue-600/90 via-blue-700/80 to-indigo-800/90 text-white">
          <h1 className="text-4xl font-semibold leading-tight mb-4">
            Internship Management Portal
          </h1>
          <p className="text-base text-blue-100 max-w-sm">
            Secure your account. Please enter your new password to complete the registration process.
          </p>
        </div>

        <div className="flex-1 w-full px-8 py-10 md:py-14">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-white">
                Reset Password
              </CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enter your new password below.
              </p>
            </CardHeader>

            <CardContent className="space-y-6 mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter new password"
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="pl-9"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
              <p>
                Remember your password?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
