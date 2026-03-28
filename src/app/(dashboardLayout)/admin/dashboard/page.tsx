"use client";

import { useGetDashboardStatsQuery } from "@/redux/api/adminApi";
// import PageLoading from "@/components/shared/PageLoading"; // If available
import { Users, CreditCard, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error loading dashboard statistics. Please try again later.
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Subscriptions",
      value: stats?.activeSubscriptions || 0,
      icon: CreditCard,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: `$${(stats?.monthlyRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart Section */}
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
            <div className="text-sm text-muted-foreground border rounded-md px-2 py-1">This Year</div>
        </CardHeader>
        <CardContent className="h-[300px] flex items-end justify-between px-10 pb-10">
            {stats?.annualRevenueChart?.map((item: any, idx: number) => {
                const maxRevenue = Math.max(...stats.annualRevenueChart.map((i: any) => i.revenue), 1);
                const barHeight = (item.revenue / maxRevenue) * 100;
                
                return (
                    <div key={idx} className="flex flex-col items-center gap-2 w-full">
                        <div className="relative group w-3 min-w-[12px]">
                            {/* Bar */}
                            <div 
                                className="bg-[#006064] rounded-t-sm transition-all duration-500 ease-in-out w-full"
                                style={{ height: `${Math.max(barHeight, 5)}%` }}
                            ></div>
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 transition-opacity">
                                ${item.revenue}
                            </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{item.month}</span>
                    </div>
                )
            })}
        </CardContent>
      </Card>

      {/* Recent Subscriptions Table */}
      <Card className="border-none shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-transparent border-b">
                <TableHead className="font-semibold text-muted-foreground">User</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Date</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Plan</TableHead>
                <TableHead className="font-semibold text-muted-foreground text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.recentSubscriptions?.length > 0 ? (
                stats.recentSubscriptions.map((sub: any) => (
                  <TableRow key={sub.id} className="hover:bg-muted/50 border-b">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={sub.user?.profileImage} />
                          <AvatarFallback>{sub.user?.fullName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{sub.user?.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sub.createdAt ? format(new Date(sub.createdAt), "MMM dd, yy") : "N/A"}
                    </TableCell>
                    <TableCell className="text-sm">{sub.plan?.name || "N/A"}</TableCell>
                    <TableCell className="text-right font-bold text-sm">${sub.amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                    No recent subscriptions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
