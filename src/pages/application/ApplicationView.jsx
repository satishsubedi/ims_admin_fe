import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApplicationByIdAction } from "../../features/application/applicationaction";
import { jsPDF } from "jspdf";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  ArrowLeft,
  FileText,
  ExternalLink,
  Code2,
  CheckCircle2,
  Clock3,
  AlertCircle,
  XCircle,
  History,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";

/**
 * Premium Status Badge with specific icons and vibrant colors
 */
const StatusBadge = ({ status }) => {
  const configs = {
    pending: {
      label: "Pending Review",
      icon: Clock3,
      classes: "bg-amber-50 text-amber-700 border-amber-200/50 shadow-[0_2px_10px_-3px_rgba(245,158,11,0.2)]",
      dot: "bg-amber-500"
    },
    under_review: {
      label: "Under Review",
      icon: History,
      classes: "bg-indigo-50 text-indigo-700 border-indigo-200/50 shadow-[0_2px_10px_-3px_rgba(79,70,229,0.2)]",
      dot: "bg-indigo-500"
    },
    accepted: {
      label: "Accepted",
      icon: CheckCircle2,
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200/50 shadow-[0_2px_10px_-3px_rgba(16,185,129,0.2)]",
      dot: "bg-emerald-500"
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      classes: "bg-rose-50 text-rose-700 border-rose-200/50 shadow-[0_2px_10px_-3px_rgba(225,29,72,0.2)]",
      dot: "bg-rose-500"
    },
    withdrawn: {
      label: "Withdrawn",
      icon: AlertCircle,
      classes: "bg-slate-100 text-slate-600 border-slate-200 shadow-none",
      dot: "bg-slate-400"
    },
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${config.classes}`}>
       <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${config.dot}`} />
       <Icon className="w-3.5 h-3.5" />
       {config.label.toUpperCase()}
    </div>
  );
};

/**
 * Section title with a decorative indicator
 */
const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-xl bg-slate-900/5 border border-slate-900/10 dark:bg-white/5 dark:border-white/10">
      <Icon className="w-4 h-4 text-slate-600" />
    </div>
    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</h3>
  </div>
);

const ApplicationView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { application } = useSelector((state) => state.applicationInfo);

  useEffect(() => {
    if (id) {
      dispatch(getApplicationByIdAction(id));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(20, 20, 20);
    doc.text("INTERNSHIP APPLICATION DETAILS", 14, 25);
    doc.line(14, 28, 196, 28);

    doc.setFontSize(11);
    doc.text(`Applicant: ${application?.profileId?.fName} ${application?.profileId?.lName}`, 14, 40);
    doc.text(`Email: ${application?.profileId?.authId?.email || "N/A"}`, 14, 47);
    doc.text(`Internship: ${application?.internshipId?.title}`, 14, 54);
    doc.text(`Status: ${application?.status?.replace('_', ' ').toUpperCase()}`, 14, 61);
    doc.text(`Submitted On: ${new Date(application?.submittedAt || application?.createdAt).toLocaleString()}`, 14, 68);

    doc.setFontSize(12);
    doc.text("MOTIVATION", 14, 82);
    doc.setFontSize(10);
    const splitMotivation = doc.splitTextToSize(application?.preferences?.whyThisInternship || "N/A", 182);
    doc.text(splitMotivation, 14, 90);

    doc.save(`Application_${application?.profileId?.fName}_${id?.substring(0, 6)}.pdf`);
  };

  if (!application || Object.keys(application).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-indigo-600 opacity-50" />
          </div>
        </div>
        <p className="text-slate-500 font-medium animate-pulse">Retreiving application data...</p>
      </div>
    );
  }

  const applicantName = `${application?.profileId?.fName} ${application?.profileId?.lName}`;
  const submittedDate = application?.submittedAt || application?.createdAt;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pb-20 overflow-x-hidden">
      {/* Dynamic Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 md:pt-12 relative z-10">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between mb-10 group">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 hover:bg-white border boundary-transparent hover:border-slate-200 rounded-xl transition-all duration-300 px-4"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold">Exit View</span>
          </Button>

          <div className="flex items-center gap-4">
            <StatusBadge status={application.status} />
            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
            <Button 
              onClick={handleDownloadPDF} 
              className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 active:scale-95 transition-all px-6 py-5 h-auto rounded-xl flex items-center gap-3 font-bold"
            >
              <Download className="h-5 w-5" />
              DOWNLOAD REPORT
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content (LHS) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Applicant Profile Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-3xl blur opacity-[0.08] group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 shrink-0">
                    <User size={48} className="drop-shadow-lg" />
                  </div>
                  <div className="space-y-3 flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-start justify-center">
                      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{applicantName}</h1>
                      <div className="flex justify-center md:justify-start">
                        <StatusBadge status={application.status} />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 font-medium">
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                        <Briefcase className="w-4 h-4 text-indigo-500" />
                        <span>{application?.internshipId?.title}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>ID: {application._id?.substring(0, 12)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-8 opacity-50" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Email</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 break-all">{application?.profileId?.authId?.email || application?.profileId?.email || "N/A"}</p>
                  </div>
                  <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-2 text-emerald-600 mb-1">
                      <Phone className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Phone</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">{application?.profileId?.phone || "N/A"}</p>
                  </div>
                  <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Applied</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">{new Date(submittedDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Detail Sections */}
            <div className="grid grid-cols-1 gap-10 mt-8 animate-in slide-in-from-bottom-5 duration-700">
              
              <div className="space-y-10">
                <section>
                  <SectionHeader title="Statement of Purpose" icon={User} />
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-2xl blur group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative p-7 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/60 leading-relaxed text-slate-700">
                      <div className="absolute top-4 right-4">
                        <LayoutDashboard className="w-8 h-8 text-slate-100" />
                      </div>
                      <p className="relative z-10 font-medium italic mb-2 text-indigo-600/60 uppercase text-[10px] tracking-widest">Why this opportunity?</p>
                      <p className="relative z-10 text-lg leading-relaxed font-medium text-slate-800">
                         {application?.preferences?.whyThisInternship || "No motivation statement provided for this application."}
                      </p>
                    </div>
                  </div>
                </section>

                {application?.preferences?.coverLetter && (
                  <section>
                    <SectionHeader title="Cover Letter Attachment" icon={FileText} />
                    <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/60 text-slate-700 whitespace-pre-wrap leading-relaxed font-normal">
                      {application.preferences.coverLetter}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area (RHS) */}
          <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-12">
            
            {/* Quick Specs / Preferences */}
            <Card className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 border-indigo-100/50 bg-white/80 backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 pb-12">
                <CardTitle className="text-xl flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" /> Preferences
                </CardTitle>
                <CardDescription className="text-indigo-100 opacity-80 italic font-medium">Selected by candidate</CardDescription>
              </CardHeader>
              <CardContent className="-mt-6 bg-white dark:bg-slate-900 rounded-t-3xl pt-8 px-6 pb-8 space-y-6">
                {[
                  { label: "Desired Start", value: application?.preferences?.startDate ? new Date(application.preferences.startDate).toLocaleDateString() : "Flexible", icon: Calendar, color: "text-blue-500" },
                  { label: "Duration", value: application?.preferences?.duration || "N/A", icon: Clock, color: "text-amber-500" },
                  { label: "Work Mode", value: application?.preferences?.workMode || "N/A", icon: MapPin, color: "text-rose-500", capitalize: true },
                  { label: "Stipend Expectation", value: application?.preferences?.expectedStipend || "N/A", icon: Briefcase, color: "text-emerald-500" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group/pref">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-slate-50 border border-slate-100 transition-colors group-hover/pref:bg-white`}>
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <span className="text-sm font-bold text-slate-500">{item.label}</span>
                    </div>
                    <span className={`text-sm font-extrabold text-slate-900 ${item.capitalize ? 'capitalize' : ''}`}>{item.value}</span>
                  </div>
                ))}

                <Separator className="my-2" />

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="h-4 w-4 text-indigo-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Expertise</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(application?.profileId?.technologies || []).map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-[10px] border border-indigo-100 shadow-sm shadow-indigo-500/5 hover:-translate-y-0.5 transition-transform cursor-default">
                        {tech.toUpperCase()}
                      </span>
                    ))}
                    {(!application?.profileId?.technologies || application?.profileId?.technologies?.length === 0) && (
                      <span className="text-xs text-slate-400 italic font-medium">No skills listed</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* External Links / Documents */}
            <div className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 flex items-center gap-2">
                 <FileText className="w-4 h-4" /> Verified Credentials
               </h3>
               
               <a 
                 href={application?.documents?.resumeUrl || "#"} 
                 target="_blank" 
                 rel="noreferrer" 
                 className={`flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 group/link ${application?.documents?.resumeUrl ? 'bg-indigo-600 border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98]' : 'bg-slate-100 border-slate-200 pointer-events-none opacity-60'}`}
               >
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-white/10 rounded-2xl group-hover/link:bg-white/20 transition-colors">
                     <FileText className="h-6 w-6 text-white" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-white font-bold text-sm tracking-tight">Main Resume</span>
                     <span className="text-indigo-100 text-[10px] font-medium opacity-80 uppercase tracking-widest">Digital Asset Document</span>
                   </div>
                 </div>
                 <ExternalLink className="h-5 w-5 text-white opacity-40 group-hover/link:opacity-100 transition-all group-hover/link:translate-x-1" />
               </a>

               <a 
                 href={application?.documents?.portfolioUrl || "#"} 
                 target="_blank" 
                 rel="noreferrer" 
                 className={`flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 group/link ${application?.documents?.portfolioUrl ? 'bg-emerald-600 border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98]' : 'bg-slate-100 border-slate-200 pointer-events-none opacity-60'}`}
               >
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-white/10 rounded-2xl group-hover/link:bg-white/20 transition-colors">
                     <Code2 className="h-6 w-6 text-white" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-white font-bold text-sm tracking-tight">Project Portfolio</span>
                     <span className="text-emerald-100 text-[10px] font-medium opacity-80 uppercase tracking-widest">Active Contributions</span>
                   </div>
                 </div>
                 <ExternalLink className="h-5 w-5 text-white opacity-40 group-hover/link:opacity-100 transition-all group-hover/link:translate-x-1" />
               </a>
            </div>

            {/* Admin Internal Note Placeholder */}
            <div className="p-6 rounded-3xl border border-dotted border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-center gap-2">
               <ShieldCheck className="w-8 h-8 text-slate-300" />
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-normal px-4">Internal review module available in edit mode</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationView;
