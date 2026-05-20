import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Droplets, 
  Syringe, 
  ClipboardList, 
  Zap, 
  Calendar,
  Phone,
  MessageSquare,
  ShieldCheck,
  Check,
  Building2,
  Sparkles
} from "lucide-react";
import { testMenu } from '../constants';

const TestDetailPage = () => {
    const { testName } = useParams<{ testName: string }>();
    const navigate = useNavigate();
    const test = testMenu.find(t => t.name === decodeURIComponent(testName || ''));

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        time: "",
    });
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        phone?: string;
        date?: string;
        time?: string;
    }>({});
    const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle");

    if (!test) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6">
                <div className="bg-white p-8 rounded-3xl border border-google-border/60 shadow-xl max-w-md w-full text-center">
                    <p className="text-xl font-bold text-google-grey mb-6">Diagnostic test not found.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="bg-google-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: typeof formErrors = {};
        
        if (!formData.name.trim()) {
            errors.name = "Full name is required";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
            errors.phone = "Enter a valid 10-digit number";
        }
        if (!formData.date) {
            errors.date = "Preferred date is required";
        }
        if (!formData.time) {
            errors.time = "Time slot is required";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setBookingStatus("submitting");
        
        setTimeout(() => {
            setBookingStatus("success");
            const whatsappNumber = "9115459115";
            const message = `*New Appointment Request via Test Page*\n\n*Test Name:* ${test.name}\n*Patient:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date:* ${formData.date}\n*Time Slot:* ${formData.time}\n\nPlease confirm my home collection slot.`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
        }, 1000);
    };

    return (
        <div className="min-h-screen w-full bg-[#f8f9fa] font-sans overflow-x-hidden pb-12">
            {/* Minimal Premium Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-google-border/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 rounded-xl bg-google-blue flex items-center justify-center shadow-md">
                            <span className="text-white font-black text-xl">A</span>
                        </div>
                        <div>
                            <p className="font-black text-xs uppercase tracking-widest text-[#202124]">
                                Agilus Diagnostics
                            </p>
                            <p className="text-[9px] text-google-grey font-bold uppercase tracking-widest leading-none mt-0.5">
                                Sector 69 Mohali
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-google-grey text-xs font-black uppercase tracking-widest">
                        <Building2 className="w-4 h-4 text-google-blue" />
                        <span>NABL Accredited</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
                {/* Back Link */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="group inline-flex items-center gap-2 text-google-grey hover:text-google-blue mb-8 font-black text-xs uppercase tracking-widest transition-colors bg-white px-5 py-3 rounded-full border border-google-border/50 shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    Back to Test Menu
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Test Specifications */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-[2rem] border border-google-border/60 p-6 md:p-10 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-google-blue/5 rounded-bl-full pointer-events-none" />
                            
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-google-blue bg-google-blue/5 border border-google-blue/10 px-3.5 py-1.5 rounded-full shadow-sm">
                                    {test.code}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-agilus-green bg-agilus-green/5 border border-agilus-green/10 px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> Best Price
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-[#202124] leading-tight tracking-tight mb-4">
                                {test.name}
                            </h1>

                            <p className="text-google-grey font-medium text-sm leading-relaxed mb-8">
                                Complete diagnostics processed under global quality standards with NABL certified reporting. Available with 24/7 complimentary home collection services across Mohali Sector 69 and surrounding areas.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-google-light-grey/40 border border-google-border/30 rounded-2xl">
                                    <Zap className="text-google-blue w-5 h-5 mb-2"/>
                                    <p className="text-google-grey text-[10px] font-bold uppercase tracking-wider">Offer Price</p>
                                    <p className="font-black text-xl text-[#202124]">₹{test.mrp}</p>
                                </div>
                                <div className="p-4 bg-google-light-grey/40 border border-google-border/30 rounded-2xl">
                                    <Clock className="text-google-blue w-5 h-5 mb-2"/>
                                    <p className="text-google-grey text-[10px] font-bold uppercase tracking-wider">Report TAT</p>
                                    <p className="font-black text-xl text-[#202124]">{test.tat}</p>
                                </div>
                                <div className="p-4 bg-google-light-grey/40 border border-google-border/30 rounded-2xl col-span-2 md:col-span-1">
                                    <Droplets className="text-google-blue w-5 h-5 mb-2"/>
                                    <p className="text-google-grey text-[10px] font-bold uppercase tracking-wider">Sample Type</p>
                                    <p className="font-black text-sm text-[#202124] leading-tight mt-1">{test.sample.split(" ")[0]}</p>
                                </div>
                            </div>
                        </div>

                        {/* Extended Details */}
                        <div className="bg-white rounded-[2rem] border border-google-border/60 p-6 md:p-10 shadow-sm space-y-6">
                            <h2 className="text-xl font-black text-[#202124] uppercase tracking-wide border-b border-google-border/50 pb-4">
                                Clinical Guidelines & Info
                            </h2>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-google-blue/5 border border-google-blue/10 flex items-center justify-center shrink-0">
                                        <Syringe className="w-5 h-5 text-google-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-black text-google-grey uppercase tracking-wider mb-1">Pre-Test Preparation</h3>
                                        <p className="text-sm font-bold text-[#202124] leading-relaxed">
                                            {test.preparation}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-google-blue/5 border border-google-blue/10 flex items-center justify-center shrink-0">
                                        <ClipboardList className="w-5 h-5 text-google-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-black text-google-grey uppercase tracking-wider mb-1">Testing Methodology</h3>
                                        <p className="text-sm font-bold text-[#202124] leading-relaxed">
                                            {test.method}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-agilus-green/5 border border-agilus-green/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-agilus-green" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-black text-google-grey uppercase tracking-wider mb-1">Quality Assurance</h3>
                                        <p className="text-sm font-bold text-[#202124] leading-relaxed">
                                            Processed in NABL & CAP Accredited environment. Follows international laboratory diagnostics legacy of Agilus Diagnostics (formerly SRL Diagnostics).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Local trust banner */}
                        <div className="bg-gradient-to-r from-google-blue to-blue-700 text-white rounded-[2rem] p-6 md:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="font-black text-lg md:text-xl">Home Blood Collection Available</h3>
                                <p className="text-xs text-white/80 mt-1 uppercase font-bold tracking-widest">
                                    No extra charge for Mohali residents • 24/7 Service
                                </p>
                            </div>
                            <a href="tel:9115459115" className="bg-white text-google-blue px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-center shadow-lg hover:bg-google-light-grey transition-colors shrink-0">
                                Call Support
                            </a>
                        </div>
                    </div>

                    {/* Right Column: High-Conversion Appointment Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[2rem] border border-google-border/60 p-6 md:p-8 shadow-lg sticky top-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-agilus-green/10 flex items-center justify-center border border-agilus-green/20">
                                    <Calendar className="w-4 h-4 text-agilus-green" />
                                </div>
                                <h2 className="text-lg font-black text-[#202124] uppercase tracking-wide">
                                    Book Home Visit
                                </h2>
                            </div>

                            <AnimatePresence mode="wait">
                                {bookingStatus === "success" ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-agilus-green/10 border border-agilus-green/25 text-agilus-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                            <Check className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-xl font-black text-[#202124] mb-2">Slot Requested!</h3>
                                        <p className="text-sm text-google-grey leading-relaxed max-w-xs mx-auto mb-6">
                                            We have opened WhatsApp to confirm your home sample collection slot. Redirecting you...
                                        </p>
                                        <button 
                                            onClick={() => setBookingStatus("idle")} 
                                            className="text-xs uppercase font-black text-google-blue hover:underline tracking-widest"
                                        >
                                            Submit Another Request
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form 
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div>
                                            <label className="block text-[10px] font-black text-google-grey uppercase tracking-wider mb-2">Patient Full Name</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter full name" 
                                                className={`w-full bg-[#f8f9fa] border ${formErrors.name ? 'border-red-500' : 'border-google-border/60'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-google-blue focus:bg-white transition-all`}
                                            />
                                            {formErrors.name && (
                                                <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.name}</span>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-google-grey uppercase tracking-wider mb-2">WhatsApp / Phone Number</label>
                                            <input 
                                                type="tel" 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter 10-digit mobile" 
                                                className={`w-full bg-[#f8f9fa] border ${formErrors.phone ? 'border-red-500' : 'border-google-border/60'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-google-blue focus:bg-white transition-all`}
                                            />
                                            {formErrors.phone && (
                                                <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.phone}</span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-google-grey uppercase tracking-wider mb-2">Preferred Date</label>
                                                <input 
                                                    type="date" 
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleInputChange}
                                                    className={`w-full bg-[#f8f9fa] border ${formErrors.date ? 'border-red-500' : 'border-google-border/60'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-google-blue focus:bg-white transition-all`}
                                                />
                                                {formErrors.date && (
                                                    <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.date}</span>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black text-google-grey uppercase tracking-wider mb-2">Preferred Time Slot</label>
                                                <select 
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleInputChange}
                                                    className={`w-full bg-[#f8f9fa] border ${formErrors.time ? 'border-red-500' : 'border-google-border/60'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-google-blue focus:bg-white transition-all`}
                                                >
                                                    <option value="">Select slot</option>
                                                    <option value="07:00 AM - 09:00 AM">07:00 AM - 09:00 AM</option>
                                                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                                                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                                                    <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                                                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                                                    <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                                                </select>
                                                {formErrors.time && (
                                                    <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.time}</span>
                                                )}
                                            </div>
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={bookingStatus === "submitting"}
                                            className="w-full bg-google-blue text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-blue-600 transition-all disabled:opacity-50 active:scale-98 flex items-center justify-center gap-2 mt-4"
                                        >
                                            {bookingStatus === "submitting" ? (
                                                "Confirming Slot..."
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Submit Booking Request
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>

                            <div className="mt-6 pt-6 border-t border-google-border/50 text-center">
                                <div className="inline-flex items-center gap-2.5 bg-google-light-grey/60 px-4 py-2 rounded-xl border border-google-border/20 shadow-sm">
                                    <ShieldCheck className="w-4 h-4 text-agilus-green" />
                                    <span className="text-[9px] font-black text-google-grey tracking-wider uppercase">
                                        NABL Accredited Diagnostics Lab Mohali
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TestDetailPage;
