import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationByIdAction } from "../../features/application/applicationaction";

import { updateApplicationStatusApi } from "../../features/application/applicationapi";
const ApplicationUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getApplicationByIdAction(id));
  }, [dispatch, id]);
  const { application } = useSelector((state) => state.applicationInfo);
  const [formData, setFormData] = useState({
    applicant_name: "",
    status: "",
    internshipfor: "",
  });
  useEffect(() => {
    if (application) {
      setFormData({
        applicant_name:
          application?.profileId?.fName + " " + application?.profileId?.lName,
        status: application?.status,
        internshipfor: application?.internshipId?.title,
      });
    }
  }, [application]);

  const handleonUpdate = async () => {
    //handle update application api call here
    const { status } = await updateApplicationStatusApi(id, formData.status);
    if (status === "success") {
      //optional : dispatch action to refresh application list or navigate
      navigate("/applications");
    }
  };

  return (
    <>
      <h1 className="flex justify-center text-4xl">Update Application</h1>
      <div className="flex justify-center mt-6">
        <div className="max-w-2xl ">
          <Card className="flex flex-coljustify-center">
            <CardHeader>
              <CardTitle>Update Application</CardTitle>
              <CardDescription>
                Fill in the details to update the application.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="applicant_name">Applicant Name</Label>
                <Input
                  id="applicant_name"
                  placeholder="John Doe"
                  value={formData.applicant_name}
                  //   onChange={handleChange}
                />
              </div>

              {/* Internship For */}
              <div className="space-y-1.5">
                <Label htmlFor="internshipfor">Internship For</Label>
                <Textarea
                  id="internshipfor"
                  placeholder="Learn the art of DevOps in a cloud-native environment..."
                  value={formData.internshipfor}
                  //   onChange={handleChange}
                />
              </div>

              <select
                className="border px-3 py-2 rounded"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="accepted">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-green-500" onClick={handleonUpdate}>
                Update
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ApplicationUpdate;
