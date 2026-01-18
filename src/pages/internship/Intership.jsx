import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Building2,
  Clock,
  CircleDollarSign,
  Users,
  ArrowLeft,
  Share2,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";
import { fetchInternshipActionsByslug, updateInternshipActionsBySlug } from "../../features/internship/internshipaction.js";
import { toast } from "react-toastify";

const Intership = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { internship } = useSelector((state) => state.internshipInfo);
  const [activeTab, setActiveTab] = useState("details");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchInternshipActionsByslug(slug));
    }
  }, [dispatch, slug]);

  const handleCloseApplication = async () => {
    if (window.confirm("Are you sure you want to close this application? It will be marked as inactive.")) {
      setIsUpdating(true);
      const result = await dispatch(updateInternshipActionsBySlug(slug, { status: "inactive" }));
      setIsUpdating(false);
      if (result.success) {
        toast.success("Internship application closed successfully");
      } else {
        toast.error(result.message || "Failed to close application");
      }
    }
  };

  if (!internship?._id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading internship details...</p>
      </div>
    );
  }

  const tabs = [
    { id: "details", label: "Description", icon: FileText },
    { id: "dates", label: "Dates & Duration", icon: Clock },
    { id: "requirements", label: "Skills & Stack", icon: Briefcase },
    { id: "faq", label: "FAQ", icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-20 relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 md:pt-12 relative z-10">
        
        {/* Top Header / Nav */}
        <div className="flex items-center justify-between mb-8 group">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 hover:bg-white border boundary-transparent hover:border-slate-200 rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-bold">Back to List</span>
          </Button>

          <div className="flex items-center gap-3">
             <div className={`${internship.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm`}>
                <div className={`w-1.5 h-1.5 rounded-full ${internship.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'} `} />
                {internship.status}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content (LHS) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Main Hero Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 md:p-10 shadow-xl shadow-slate-200/50">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-2xl shadow-amber-500/20 shrink-0 rotate-1">
                   <Building2 size={48} className="drop-shadow-lg" />
                </div>
                <div className="space-y-4 flex-1">
                  <div className="space-y-1">
                    <p className="text-amber-600 font-black uppercase tracking-[0.2em] text-[10px]">{internship.company}</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 border-b-4 border-amber-400/20 inline-block pb-1 leading-tight">
                      {internship.title}
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 font-bold text-sm">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>Remote / Hybrid</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Component - Now functional */}
              <div className="mt-12 flex flex-wrap gap-2 p-1.5 bg-slate-50/80 rounded-2xl border border-slate-100">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                        active 
                          ? "bg-white text-slate-900 shadow-lg shadow-slate-200 border border-slate-100" 
                          : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? "text-amber-500" : ""}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 py-4 animate-in fade-in slide-in-from-top-2 duration-500">
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900">About the Role</h3>
                    <div className="text-slate-700 leading-relaxed text-lg font-medium whitespace-pre-wrap selection:bg-amber-100">
                      {internship.description}
                    </div>
                  </div>
                )}
                {activeTab === "dates" && (
                  <div className="space-y-8">
                     <h3 className="text-xl font-black text-slate-900">Schedule & Timeline</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-amber-200 transition-colors">
                           <Clock className="w-10 h-10 text-amber-500 mb-4 transition-transform group-hover:scale-110" />
                           <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Duration</h4>
                           <p className="text-2xl font-black text-slate-900">{internship.duration || "To be discussed"}</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-rose-200 transition-colors">
                           <Calendar className="w-10 h-10 text-rose-500 mb-4 transition-transform group-hover:scale-110" />
                           <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Deadline</h4>
                           <p className="text-2xl font-black text-slate-900">
                              {internship.applicationDeadline ? new Date(internship.applicationDeadline).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : "Open until filled"}
                           </p>
                        </div>
                     </div>
                  </div>
                )}
                {activeTab === "requirements" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900">Technology Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {internship.technologies?.map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-default">
                           <div className="w-2 h-2 rounded-full bg-amber-400" />
                           <span className="font-extrabold text-slate-800 tracking-tight">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "faq" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                       {[
                         { q: "Is this a remote position?", a: "Yes, we support remote, on-site, and hybrid working arrangements based on the role and candidate's location." },
                         { q: "What is the interview process?", a: "The process typically includes an initial screening followed by a technical challenge and a final panel interview." }
                       ].map((item, i) => (
                         <div key={i} className="p-6 rounded-3xl border border-slate-100 bg-slate-50">
                           <p className="font-black text-slate-900 mb-2">Q: {item.q}</p>
                           <p className="text-slate-600 font-medium">A: {item.a}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area (RHS) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-12 h-fit">
            
            {/* Quick Summary Card */}
            <Card className="rounded-[2.5rem] overflow-hidden border-none shadow-2xl shadow-amber-500/10 bg-slate-900 text-white">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <CheckCircle2 className="text-amber-400 h-6 w-6" /> Quick Facts
                </CardTitle>
                <CardDescription className="text-slate-400 font-bold italic">Overview for recruiters</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 <div className="space-y-5">
                    <div className="flex items-center justify-between">
                       <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Stipend</span>
                       <span className="text-xl font-black text-amber-400 flex items-center gap-2">
                          <CircleDollarSign className="w-5 h-5" />
                          {internship.stipend ? `$${internship.stipend}` : "Unpaid"}
                       </span>
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex items-center justify-between">
                       <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Post By</span>
                       <span className="text-sm font-bold text-slate-200">{internship.postedByName || "Internal System"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Applicants</span>
                       <span className="text-sm font-bold text-slate-200">{internship.applicationCount || 0} Candidates</span>
                    </div>
                 </div>

                 <div className="pt-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Internal Admin View</p>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${internship.status === 'active' ? 'bg-green-500/20' : 'bg-rose-500/20'} flex items-center justify-center`}>
                             <CheckCircle2 className={`w-4 h-4 ${internship.status === 'active' ? 'text-green-400' : 'text-rose-400'}`} />
                          </div>
                          <span className="text-xs font-bold text-slate-300">{internship.status === 'active' ? 'Published & Live' : 'Closed / Inactive'}</span>
                       </div>
                    </div>
                 </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <div className="grid grid-cols-1 gap-4">
               <Button 
                onClick={() => navigate(`/update_internship/${slug}`)}
                className="w-full bg-white hover:bg-slate-50 text-slate-900 font-black py-8 rounded-[2rem] border-2 border-slate-200 shadow-lg active:scale-95 transition-all text-lg"
              >
                Edit Parameters
              </Button>
               <Button 
                onClick={handleCloseApplication}
                disabled={isUpdating || internship.status !== 'active'}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-8 rounded-[2rem] shadow-xl active:scale-95 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {internship.status === 'active' ? 'Close Application' : 'Application Closed'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intership;
