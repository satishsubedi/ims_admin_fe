import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfileByIdAction } from "../../features/user/useraction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowLeft, 
  ShieldCheck, 
  Calendar,
  Briefcase,
  GraduationCap
} from "lucide-react";

const UserView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (id) {
      dispatch(getUserProfileByIdAction(id));
    }
  }, [dispatch, id]);

  if (!selectedUser?._id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Users
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <p className="text-gray-600 mt-1">
              Detailed information for {selectedUser.fName} {selectedUser.lName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar / Summary Card */}
          <Card className="md:col-span-1 shadow-md">
            <CardContent className="pt-6 pb-6 h-full flex flex-col items-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-inner">
                {selectedUser.fName?.charAt(0).toUpperCase()}
                {selectedUser.lName?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-center mb-1">
                {selectedUser.fName} {selectedUser.lName}
              </h2>
              <p className="text-gray-500 text-center mb-4">{selectedUser.email}</p>
              
              <div className="w-full space-y-3 mt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-slate-50 p-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Role: <span className="font-semibold capitalize">{Array.isArray(selectedUser.usertype) ? selectedUser.usertype[0] : selectedUser.role}</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-slate-50 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Verified: <span className="font-semibold">{selectedUser.verified ? "Yes" : "No"}</span></span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">First Name</Label>
                    <p className="text-gray-900 font-medium">{selectedUser.fName}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">Last Name</Label>
                    <p className="text-gray-900 font-medium">{selectedUser.lName}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">Email Address</Label>
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <Mail className="w-3 h-3 text-gray-400" /> {selectedUser.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">Phone Number</Label>
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <Phone className="w-3 h-3 text-gray-400" /> {selectedUser.mobile || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Info */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">Address</Label>
                    <p className="text-gray-900 font-medium">{selectedUser.address || "N/A"}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 font-medium">
                    <div className="space-y-1 text-sm">
                      <Label className="text-xs text-gray-400 uppercase tracking-wider">City</Label>
                      <p>{selectedUser.city || "N/A"}</p>
                    </div>
                    <div className="space-y-1 text-sm">
                      <Label className="text-xs text-gray-400 uppercase tracking-wider">State</Label>
                      <p>{selectedUser.state || "N/A"}</p>
                    </div>
                    <div className="space-y-1 text-sm">
                      <Label className="text-xs text-gray-400 uppercase tracking-wider">Zip Code</Label>
                      <p>{selectedUser.pincode || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

             {/* Education Info */}
             <Card className="shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-4">
                   <div className="space-y-1">
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">Institution</Label>
                    <p className="text-gray-900 font-medium">{selectedUser.institutionName || "N/A"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 font-medium">
                    <div className="space-y-1 text-sm">
                      <Label className="text-xs text-gray-400 uppercase tracking-wider">Degree</Label>
                      <p>{selectedUser.degree || "N/A"}</p>
                    </div>
                    <div className="space-y-1 text-sm">
                      <Label className="text-xs text-gray-400 uppercase tracking-wider">CGPA</Label>
                      <p>{selectedUser.cgpa || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
