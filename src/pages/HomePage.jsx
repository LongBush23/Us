import FriendRequests from "@components/FriendRequests";
import Post from "@components/Post";
import PostCreation from "@components/PostCreation";
import PostList from "@components/PostList";
import Sidebar from "@components/sidebar";

function HomePage() {
  return (
    <div className="flex gap-4 bg-st-200 p-6">
      <Sidebar />
      <div className="flex flex-1 flex-col gap-4">
        <PostCreation />
        <PostList />
      </div>
      <div className="hidden w-64 sm:block">
        <FriendRequests />
      </div>
    </div>
  );
}

export default HomePage;
