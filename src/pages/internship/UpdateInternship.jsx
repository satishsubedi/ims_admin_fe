import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchInternshipActionsByslug } from "../../features/internship/internshipaction.js";

import { updateInternshipBySlugApi } from "../../features/internship/internshipapi.js";

const UpdateInternship = () => {
  const { internship } = useSelector((state) => state.internshipInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    technologies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleonUpdate = async () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      company: formData.company,
      location: formData.location,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
      stipend: formData.stipend,
      duration: formData.duration,
      applicationDeadline: formData.applicationDeadline,
    };

    // Call API to create formdata
    const { status } = await updateInternshipBySlugApi(slug, payload);
    if (status === "success") {
      // Optionally, you can dispatch an action to refresh the internship list or navigate
      navigate("/allinternships");
    }

    // const result = createInternshipApi(payload);
  };

  useEffect(() => {
    if (slug) {
      dispatch(fetchInternshipActionsByslug(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (internship) {
      setFormData({
        title: internship.title || "",
        description: internship.description || "",
        company: internship.company || "",
        location: internship.location || "",
        technologies: internship.technologies
          ? internship.technologies.join(", ")
          : "",
        stipend: internship.stipend || "",
        duration: internship.duration || "",
        applicationDeadline: internship.applicationDeadline
          ? internship.applicationDeadline.split("T")[0]
          : "",
      });
    }
  }, [internship]);

  return (
    <>
      <h1 className="flex justify-center text-4xl">Update Internship</h1>
      <div className="flex justify-center mt-6">
        <div className="max-w-2xl ">
          <Card className="flex flex-coljustify-center">
            <CardHeader>
              <CardTitle>Update Internship</CardTitle>
              <CardDescription>
                Fill in the details to create a new formdata.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="DevOps Engineer Intern"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Learn the art of DevOps in a cloud-native environment..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="CloudTech Systems"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Seattle, WA"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* Technologies */}
              <div className="space-y-1.5">
                <Label htmlFor="technologies">Technologies</Label>
                <Input
                  id="technologies"
                  placeholder="AWS, Docker, Kubernetes, Jenkins, Terraform"
                  value={formData.technologies}
                  onChange={handleChange}
                />
              </div>

              {/* stipend */}
              <div className="space-y-1.5">
                <Label htmlFor="stipend">Stipend</Label>
                <Input
                  id="stipend"
                  placeholder="1000"
                  value={formData.stipend}
                  onChange={handleChange}
                />
              </div>
              {/* duration */}
              <div className="space-y-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="3 months"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
              {/* applicationDeadline */}
              <div className="space-y-1.5">
                <Label htmlFor="applicationDeadline">
                  Application Deadline
                </Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  placeholder="2024-12-31"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                />
              </div>
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

export default UpdateInternship;
