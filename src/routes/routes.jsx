import React from 'react'
import BoyPage from '~/app/Boy'
import GirlPage from '~/app/Girl'
import CompletedPage from '~/app/Completed'
import GenresPage from '~/app/Genres'
import HomePage from '~/app/Home'
import NewPage from '~/app/New'
import RecentUpdatePage from '~/app/RecentUpdate'
import TopPage from '~/app/Top'
import TrendingPage from '~/app/Trending'
import ChapterPage from '~/app/Chapter'
import ComicDetailsPage from '~/app/ComicDetails'
import HistoryPage from '~/app/History'
import SearchPage from '~/app/Search'

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home'
  },
  {
    path: '/genres/:genre_id',
    element: <GenresPage />,
    state: 'genres'
  },
  {
    path: '/trending',
    element: <TrendingPage />,
    state: 'trending'
  },
  {
    path: '/new',
    element: <NewPage />,
    state: 'new'
  },
  {
    path: '/top',
    element: <TopPage />,
    state: 'top'
  },
  {
    path: '/boy',
    element: <BoyPage />,
    state: 'boy'
  },
  {
    path: '/girl',
    element: <GirlPage />,
    state: 'girl'
  },
  {
    path: '/recent-update',
    element: <RecentUpdatePage />,
    state: 'recent-update'
  },
  {
    path: '/completed',
    element: <CompletedPage />,
    state: 'completed'
  },
  {
    path: '/history',
    element: <HistoryPage />,
    state: 'history'
  },
  {
    path: '/comic/:comic_id/:chapter_id',
    element: <ChapterPage />,
    state: 'chapter'
  },
  {
    path: '/comic/:comic_id',
    element: <ComicDetailsPage />,
    state: 'comic'
  },
  {
    path: '/search/',
    element: <SearchPage />,
    state: 'search'
  }
]

export default routes