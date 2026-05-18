import ProfileCraftsman from "@/components/features/craftsman/ProfileCraftsman";

export const metadata = {
  title: "الملف الشخصي | شُغلَة",
  description: "عرض وتعديل بيانات الملف الشخصي للحرفي",
};

const ProfileCraftsmanPage = () => {
  return (
    <section>
      <ProfileCraftsman />
    </section>
  );
};

export default ProfileCraftsmanPage;
