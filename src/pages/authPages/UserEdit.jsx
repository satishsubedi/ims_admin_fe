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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileByIdAction, updateAnyUserAction } from "../../features/user/useraction";
import { toast } from "react-toastify";

const UserEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.userInfo);
  
  const [form, setForm] = useState({
    fName: "",
    lName: "",
    email: "",
    role: "staff",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getUserProfileByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser?._id && selectedUser.authId === id) {
      setForm({
        fName: selectedUser.fName || "",
        lName: selectedUser.lName || "",
        email: selectedUser.email || "",
        role: selectedUser.role || "staff",
      });
    }
  }, [selectedUser, id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setForm((prev) => ({ ...prev, role: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // We need a specific action for updating other users if updateProfileAction only updates 'self'.
    // Looking at the implementation_plan, I should check if updateProfile in BE handles any user by ID or just self.
    // Existing updateProfileController in BE uses req.userInfo._id. 
    // I need a NEW controller in BE for admin to update any user.
    
    // For now, I'll proceed with the assumption that I might need a new BE endpoint.
    // But let's check existing updateProfile API.
    
    const payload = {
      fName: form.fName,
      lName: form.lName,
      roles: [form.role],
      authId: id
    };

    // If updateProfileAction only updates self, this will fail for other users.
    // I should implement a new action/api for admin-user-update.
    const response = await dispatch(updateAnyUserAction(id, payload)); 
    
    setLoading(false);
    if (response?.success) {
      toast.success("User updated successfully!");
      navigate("/users");
    }
  };

  return (
    <div className="flex items-center justify-center p-8 bg-background">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Edit User</CardTitle>
          <CardDescription className="text-center">
            Modify user details and permissions.
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
                    required
                    value={form.lName}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email (Read Only)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  disabled
                  className="bg-muted"
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
                {loading ? "Updating User..." : "Update User"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEdit;
