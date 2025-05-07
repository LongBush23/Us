// // src/context/MediaContext.js
// import { createContext, useContext, useState } from "react";

// // Tạo context
// const MediaContext = createContext();

// // Custom hook để truy cập MediaContext
// export const useMediaContext = () => useContext(MediaContext);

// // Provider để cung cấp trạng thái cho toàn bộ ứng dụng
// export const MediaProvider = ({ children }) => {
//   const [mediaState, setMediaState] = useState({
//     trendingTab: "day",
//     topRatedTab: "all",
//     trendingPage: 1, // Lưu trang hiện tại
//     topRatedPage: 1, // Lưu trang hiện tại
//   });

//   return (
//     <MediaContext.Provider value={{ mediaState, setMediaState }}>
//       {children}
//     </MediaContext.Provider>
//   );
// };
