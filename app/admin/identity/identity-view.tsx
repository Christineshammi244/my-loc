"use client"
import { useState, useEffect } from "react";
import { getIdentityRequests, updateRequestStatus } from "../../actions/identityActions";
import { CheckCircle, XCircle, Clock, User, Calendar, ShieldCheck, Search, Image as ImageIcon } from "lucide-react";

export function IdentityView() {
    const [allRequests, setAllRequests] = useState<any[]>([]); 
    const [filteredRequests, setFilteredRequests] = useState<any[]>([]); 
    const [selectedReq, setSelectedReq] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("PENDING"); 
    const [searchTerm, setSearchTerm] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const data = await getIdentityRequests();
            const safeData = data || [];
            setAllRequests(safeData);
            const pending = safeData.filter((r: any) => r.status === "PENDING");
            setFilteredRequests(pending);
            if (pending.length > 0) setSelectedReq(pending[0]);
            setLoading(false);
        }
        loadData();
    }, []);

    useEffect(() => {
        let filtered = allRequests.filter(req => req.status === activeTab);
        if (searchTerm) {
            filtered = filtered.filter(req => 
                req.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredRequests(filtered);
        if (!filtered.find(r => r.id === selectedReq?.id)) {
            setSelectedReq(filtered.length > 0 ? filtered[0] : null);
        }
    }, [activeTab, searchTerm, allRequests]);

    const handleAction = async (status: string) => {
        if (!selectedReq) return;
        try {
            const res = await updateRequestStatus(selectedReq.id, status);
            if (res.success) {
                alert(`تم ${status === 'APPROVED' ? 'قبول' : 'رفض'} التوثيق بنجاح ✨`);
                window.location.reload();
            }
        } catch (error) {
            alert("حدث خطأ أثناء التحديث");
        }
    };

    const getCount = (status: string) => allRequests.filter(r => r.status === status).length;

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="flex flex-col h-full gap-6 p-2" dir="rtl">
            
            <div className="flex flex-wrap items-center justify-between bg-white p-3 rounded-[1.5rem] border border-slate-200 shadow-sm gap-4">
                <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
                    {[
                        { id: 'PENDING', label: 'قيد المراجعة', color: 'bg-yellow-500' },
                        { id: 'APPROVED', label: 'المكتملة', color: 'bg-green-500' },
                        { id: 'REJECTED', label: 'المرفوضة', color: 'bg-red-500' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black transition-all ${
                                activeTab === tab.id 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                            }`}
                        >
                            {tab.label}
                            <span className={`px-2 py-0.5 rounded-md text-[10px] text-white ${
                                activeTab === tab.id ? tab.color : 'bg-slate-300'
                            }`}>
                                {getCount(tab.id)}
                            </span>
                            </button>
                    ))}
                </div>
                <div className="relative flex-grow max-w-xs">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="ابحث بالاسم أو البريد..." 
                        className="w-full border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-sm outline-none focus:border-blue-400 bg-slate-50 focus:bg-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden min-h-[600px]">
                
                <div className="w-80 bg-white rounded-[2rem] border border-slate-200 overflow-y-auto shadow-sm divide-y divide-slate-50">
                    {filteredRequests.length === 0 ? (
                        <div className="p-10 text-center space-y-3">
                            <ImageIcon className="mx-auto text-slate-200" size={40} />
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">لا توجد طلبات</p>
                        </div>
                    ) : (
                        filteredRequests.map((req) => (
                            <div 
                                key={req.id} 
                                onClick={() => setSelectedReq(req)}
                                className={`p-5 cursor-pointer transition-all relative ${
                                    selectedReq?.id === req.id 
                                    ? 'bg-blue-50/50' 
                                    : 'hover:bg-slate-50'
                                }`}
                            >
                                {selectedReq?.id === req.id && <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-full"></div>}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">
                                        {req.user?.name?.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-slate-900 text-sm truncate">{req.user?.name}</p>
                                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 font-bold uppercase">
                                            <Clock size={10} /> {new Date(req.createdAt).toLocaleDateString('ar-EG')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 p-8 overflow-y-auto shadow-sm custom-scrollbar">
                    {selectedReq ? (
                        <div className="space-y-10 animate-in slide-in-from-left-4 duration-500">
                            
                            {/* 2. بطاقة بيانات المستخدم (للمطابقة) */}
                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3">
                                    <User className="text-blue-500" size={20} />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase">الاسم الكامل</p>
                                        <p className="text-sm font-black text-slate-800">{selectedReq.user?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-indigo-500" size={20} />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase">نوع الوثيقة</p>
                                        <p className="text-sm font-black text-slate-800">{selectedReq.idType || 'بطاقة شخصية'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-emerald-500" size={20} />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase">تاريخ الطلب</p>
                                        <p className="text-sm font-black text-slate-800">{new Date(selectedReq.createdAt).toLocaleDateString('ar-EG')}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-black text-slate-900 mb-6 border-r-4 border-blue-600 pr-3 italic">الوثائق الرسمية المرفوعة</h4>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {[
                                        { title: 'الوجه الأمامي للوثيقة', img: selectedReq.frontImage },
                                        { title: 'الوجه الخلفي للوثيقة', img: selectedReq.backImage }
                                    ].map((pic, idx) => (
                                        <div key={idx} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 hover:shadow-xl transition-all duration-500">
                                            <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-slate-600 shadow-sm uppercase tracking-widest">
                                                {pic.title}
                                            </div>
                                            <div className="aspect-[1.5/1] overflow-hidden">
                                                {pic.img ? (
                                                    <img src={pic.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pic.title} />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                                        <ImageIcon size={32} className="opacity-20 mb-2" />
                                                        <span className="text-[10px] font-bold tracking-widest">الصورة غير متوفرة</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">ملاحظات المراجعة (تظهر للمستخدم عند الرفض):</label>
                                    <textarea
                                    className="w-full border border-slate-200 rounded-[1.5rem] p-5 bg-slate-50 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium leading-relaxed" 
                                        rows={3}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="اكتب سبب الرفض بوضوح (مثلاً: الصورة غير واضحة، الاسم غير مطابق)..."
                                    />
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <button 
                                        onClick={() => handleAction("APPROVED")} 
                                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
                                    >
                                        <CheckCircle size={18} />
                                        اعتماد وتوثيق الحساب
                                    </button>
                                    <button 
                                        onClick={() => handleAction("REJECTED")} 
                                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-red-100 bg-white px-8 py-4 text-sm font-black text-red-600 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
                                    >
                                        <XCircle size={18} />
                                        رفض الطلب
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4">
                            <div className="p-8 bg-slate-50 rounded-full border border-slate-100">
                                <User size={64} className="opacity-10" />
                            </div>
                            <p className="text-sm font-black tracking-widest text-slate-400 italic">الرجاء اختيار طلب لمراجعته</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}