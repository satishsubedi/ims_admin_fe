import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseForm from "../../hooks/UseForm.jsx";
import { inviteStaff } from "../../features/user/userapi.js";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InviteUser = () => {
  const { handleOnChange, form, setForm } = UseForm({
    fName: "",
    lName: "",
    email: "",
    role: "staff", // default role
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (value) => {
    setForm((prev) => ({ ...prev, role: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Prepare payload (API expects roles array)
    const payload = {
      ...form,
      roles: [form.role],
    };

    const response = await inviteStaff(payload);
    
    setLoading(false);
    if (response?.status === "success") {
      toast.success("User invited successfully! Credentials sent via email.");
      setForm({ fName: "", lName: "", email: "", role: "staff" });
      navigate("/users"); // Redirect back to user list
    } else {
      // Error handling is done in apiProcessor mostly.
      // if(!response?.message) toast.error("Invitation failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-8 bg-background">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Invite New User</CardTitle>
          <CardDescription className="text-center">
            Create a new staff or admin account. They will receive an email with login credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fName">First Name *</Label>
                  <Input
                    id="fName"
                    name="fName"
                    type="text"
                    placeholder="John"
                    value={form.fName}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lName">Last Name *</Label>
                  <Input
                    id="lName"
                    name="lName"
                    type="text"
                    placeholder="Doe"
                    required
                    value={form.lName}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={form.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
            <CardFooter className="flex-col gap-2 pt-6 px-0">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending Invitation..." : "Send Invitation"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteUser;
