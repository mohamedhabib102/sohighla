"use client";
import React, { useState } from "react";
import { FiBookOpen, FiShield, FiCheckCircle, FiInfo, FiSmartphone, FiStar, FiFileText } from "react-icons/fi";

const InstructionsPage = () => {
  const [activeTab, setActiveTab] = useState<"general" | "privacy" | "terms">("general");

  const tabs = [
    { id: "general", label: "طريقة عمل المنصة", icon: FiInfo },
    { id: "terms", label: "الشروط والأحكام", icon: FiFileText },
    { id: "privacy", label: "سياسة الخصوصية", icon: FiShield },
  ];

  return (
    <section className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary font-lemonada">تعليمات المنصة</h1>
        <p className="text-gray-500 mt-1 text-lg">
          كل ما تحتاج لمعرفته حول التعامل مع منصة <span className="font-lemonada text-primary font-bold">شُغلَة</span> كحرفي
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-gray-100 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-secondary shadow-lg shadow-primary/20 scale-105"
                  : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Tabs content) */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              {/* Card 1: Direct contact */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-secondary">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <FiSmartphone size={24} />
                  </div>
                  <h3 className="text-xl font-bold">التواصل المباشر مع العملاء</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  تعتمد منصة <strong>شُغلَة</strong> على الربط المباشر بين العميل والحرفي. بمجرد أن يختار العميل ملفك الشخصي، سيقوم بالحصول على 
                  رقم هاتفك والاتصال بك مباشرة خارج المنصة. لا توجد غرف محادثة داخلية أو وسطاء بينكم.
                </p>
              </div>

              {/* Card 2: Platform Role */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-secondary">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <FiInfo size={24} />
                  </div>
                  <h3 className="text-xl font-bold">دور المنصة وحدود مسؤوليتها</h3>
                </div>
                <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <li className="flex gap-2">
                    <FiCheckCircle className="text-primary shrink-0 mt-1" size={16} />
                    <span>المنصة هي <strong>سوق إلكتروني وسيط</strong> لعرض مهاراتك فقط.</span>
                  </li>
                  <li className="flex gap-2">
                    <FiCheckCircle className="text-primary shrink-0 mt-1" size={16} />
                    <span>المنصة لا تتدخل في تسعير الخدمات أو الاتفاقيات المالية بينك وبين العميل.</span>
                  </li>
                  <li className="flex gap-2">
                    <FiCheckCircle className="text-primary shrink-0 mt-1" size={16} />
                    <span>المنصة لا تتحمل أي مسؤولية عن جودة العمل المقدم أو تحصيل المستحقات المالية.</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Ratings System */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-secondary">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <FiStar size={24} />
                  </div>
                  <h3 className="text-xl font-bold">نظام التقييم والمراجعات</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  يحق للعملاء الذين تعاملوا معك تقييم خدماتك وكتابة مراجعات في ملفك الشخصي. التقييمات الجيدة تزيد من فرص ظهور ملفك الشخصي 
                  للعملاء الآخرين وتُكسبك ثقة أكبر في السوق. احرص دائماً على التعامل بمهنية لضمان تقييمات إيجابية.
                </p>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-secondary mb-6">شروط وأحكام استخدام المنصة للحرفيين</h3>
              
              <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-secondary text-base mb-2">1. صحة ودقة البيانات</h4>
                  <p>
                    أنت ملتزم بتقديم معلومات صحيحة، حديثة ودقيقة في ملفك الشخصي (الاسم، رقم الهاتف، التخصص، سنوات الخبرة، صور الأعمال). 
                    عرض معلومات مضللة أو صور لا تخصك قد يؤدي إلى إيقاف حسابك نهائياً.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-secondary text-base mb-2">2. السلوك المهني والأخلاقي</h4>
                  <p>
                    يُحظر تماماً استخدام ملفك الشخصي أو المنصة لنشر محتوى مسيء، تشهيري، أو انتحال شخصيات حرفيين آخرين. 
                    التعامل مع العملاء يجب أن يتسم بالشفافية والالتزام بالاتفاقيات المبرمة بينكما.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-secondary text-base mb-2">3. الملكية الفكرية</h4>
                  <p>
                    يجب أن تكون الصور ومقاطع الفيديو التعريفية التي ترفعها في معرض أعمالك مملوكة لك بالكامل وتُعبر عن عملك الفعلي. 
                    تحتفظ بالملكية الفكرية لأعمالك وتمنح المنصة الحق في عرضها للعملاء لتسويق مهاراتك.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-secondary text-base mb-2">4. إنهاء الحساب</h4>
                  <p>
                    تحتفظ إدارة منصة <strong>شُغلَة</strong> بالحق في تعليق أو حذف حساب أي حرفي يثبت انتهاكه للشروط والأحكام، 
                    أو في حال تلقي شكاوى متكررة ومثبتة من العملاء بشأن جودة العمل أو السلوك الأخلاقي.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-secondary mb-6">سياسة الخصوصية وكيفية حماية بياناتك</h3>
              
              <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-secondary text-base mb-2">1. البيانات التي يتم عرضها للعموم</h4>
                  <p>
                    لتسهيل ربطك بالعملاء، فإن البيانات التالية تكون مرئية لجميع زوار المنصة: اسمك الأول والأخير، التخصص والمهارة، 
                    الموقع الجغرافي، سنوات الخبرة، معرض الصور، فيديو التعريف، والتقييمات.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-secondary text-base mb-2">2. رقم الهاتف والتواصل</h4>
                  <p>
                    يتم عرض رقم هاتفك فقط للعملاء المهتمين بالاتصال بك لطلب الخدمة. نحن لا نقوم ببيع أو مشاركة أرقام الهواتف أو معلومات الاتصال 
                    لأي أطراف ثالثة لأغراض تسويقية أو تجارية خارج نطاق خدمات المنصة.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-secondary text-base mb-2">3. حماية بياناتك الشخصية</h4>
                  <p>
                    نحن نستخدم تدابير أمنية تقنية وتنظيمية متقدمة لحماية معلومات حسابك وكلمات مرورك من الوصول غير المصرح به. 
                    أنت مسؤول عن الحفاظ على سرية كلمة مرور حسابك وعدم مشارقتها مع أي شخص.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-secondary text-base mb-2">4. تحديث وحذف البيانات</h4>
                  <p>
                    يمكنك تعديل بياناتك أو تحديثها في أي وقت من خلال صفحة "الملف الشخصي". كما يحق لك طلب حذف حسابك وبياناتك 
                    بالكامل من المنصة في حال رغبت في التوقف عن استخدام خدماتنا.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Guidance Tips */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-secondary border-r-2 border-primary pr-3 flex items-center gap-2">
              <FiBookOpen className="text-primary" /> إرشادات النجاح في شغلّة
            </h3>
            <div className="space-y-4 text-xs text-gray-600">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="font-bold block text-secondary mb-1">صورة شخصية واضحة</span>
                احرص على وضع صورة شخصية مهنية وواضحة لبناء الثقة الأولى مع العميل بمجرد تصفحه لملفك.
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="font-bold block text-secondary mb-1">أبرز أفضل أعمالك</span>
                قم بتحديث معرض أعمالك بصور ذات إضاءة وجودة عالية تعكس دقة تشطيباتك ولمساتك الفنية.
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="font-bold block text-secondary mb-1">كن واضحاً في الاتفاق</span>
                قبل البدء بأي عمل مع العميل، اتفق معه على السعر الإجمالي، تكلفة المواد، ومدة التنفيذ تفادياً لأي سوء تفاهم.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InstructionsPage;
