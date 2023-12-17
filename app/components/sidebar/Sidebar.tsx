import getCurrentUser from '@/app/actions/getCurrentUser';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import getConversations from '@/app/actions/getConversations';

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  const conversations = await getConversations();
  //lg:pl-80

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} initialItems={conversations} />
      <MobileFooter currentUser={currentUser!} />

      <main className=" h-full ">{children}</main>
    </div>
  );
}

export default Sidebar;
