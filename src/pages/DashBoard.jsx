import React, { useEffect } from "react";
import { Users, FileUser, Briefcase, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../features/user/useraction";
import { getAllApplicationAction } from "../features/application/applicationaction";
import { fetchInternshipActions } from "../features/internship/internshipaction";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { usersList } = useSelector((state) => state.userInfo);
  const { applications } = useSelector((state) => state.applicationInfo);
  const { internships } = useSelector((state) => state.internshipInfo);

  useEffect(() => {
    dispatch(getAllUsersAction());
    dispatch(getAllApplicationAction());
    dispatch(fetchInternshipActions());
  }, [dispatch]);

  // Calculate Stats
  const totalInterns = usersList?.filter(u => u.role === "student" || u.role === "intern").length || 0; 
  // Assuming 'student' is the role for interns. Adjust if needed.
  
  const activeApplications = applications?.length || 0;
  const openInternships = internships?.length || 0;
  
  // Calculate Placement Rate (Example: Accepted applications / Total applications)
  const acceptedApplications = applications?.filter(app => app.status === "approved" || app.status === "accepted").length || 0;
  const placementRate = activeApplications > 0 ? Math.round((acceptedApplications / activeApplications) * 100) : 0;

  const stats = [
    {
      title: "Total Interns",
      value: totalInterns.toString(),
      change: "Based on registered students",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Applications",
      value: activeApplications.toString(),
      change: "Total applications received",
      icon: FileUser,
      color: "text-orange-500",
    },
    {
      title: "Open Internships",
      value: openInternships.toString(),
      change: "Available positions",
      icon: Briefcase,
      color: "text-green-500",
    },
    {
      title: "Placement Rate",
      value: `${placementRate}%`,
      change: "Approval rate",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  const recentApplications = applications?.slice(0, 5) || [];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Application activity over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full flex items-center justify-center bg-secondary/20 rounded-md">
              <p className="text-muted-foreground">No chart data available yet</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest applications received.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent activity.</p>
              ) : (
                recentApplications.map((app, i) => (
                  <div key={app._id || i} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                         {app.profileId?.fName} {app.profileId?.lName} applied for Internship
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(app.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
