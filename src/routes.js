import Home from '@/components/Home'
import TotalSignedupStatus from '@/components/TotalSignedupStatus'
import ActiveUserStatus from '@/components/ActiveUserStatus'

export const routes = [
  {
    path: '/',
    component: Home,
    children: [
        { path: '/', component: TotalSignedupStatus },
        { path: '/ActiveUserStatus', component: ActiveUserStatus }
    ]
  },
  {
    path: '*',
    component: Home
  }
]
