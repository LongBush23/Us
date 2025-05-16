// hooks/useAuth.js

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut as logOutAction } from "@redux/slices/authSlice";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetPostsQuery } from "@services/rootApi";
import { throttle } from "lodash";

// Custom hook để logout
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logOutAction());
    navigate("/login", { replace: true });
  };

  return { logOut };
};

// Custom hook để lấy thông tin người dùng
export const useUserInfo = () => {
  return useSelector((state) => state.auth.userInfo);
};

export const useDetectLayout = () => {
  const theme = useTheme();
  const isMediumLayout = useMediaQuery(theme.breakpoints.down("md"));
  return { isMediumLayout };
};

export const useLazyLoadPost = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState([]);

  const [hasMore, setHasMore] = useState(true);

  const { data, isSuccess, isFetching } = useGetPostsQuery({
    offset,
    limit,
  });

  const previousDataRef = useRef();

  useEffect(() => {
    if (isSuccess && data && previousDataRef.current !== data) {
      if (!data.length) {
        setHasMore(false);
        return;
      }
      previousDataRef.current = data;
      setPosts((prevPosts) => {
        return [...prevPosts, ...data];
      });
    }
  }, [data, isSuccess]);

  const loadMore = useCallback(() => {
    setOffset((offset) => offset + limit);
  }, []);

  useInfiniteScroll({
    hasMore,
    isFetching,
    loadMore,
  });
  return { isFetching, posts };
};

export const useInfiniteScroll = ({
  hasMore,
  isFetching,
  loadMore,
  threshold = 50,
  throttleMs = 500,
}) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      console.log("SCROLLING");
      if (!hasMore) {
        return;
      }
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (clientHeight + scrollTop + threshold >= scrollHeight && !isFetching) {
        loadMore();
      }
    }, throttleMs);
  }, [hasMore, isFetching, loadMore, throttleMs, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);
};
