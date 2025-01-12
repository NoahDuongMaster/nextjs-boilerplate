import { Suspense } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/common/breadcrumb';
import { Separator } from '@/components/common/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/common/sidebar';
import { Skeleton } from '@/components/common/skeleton';
import { AppSidebar } from '@/components/features/app-sidebar';
import ComponentExample from '@/components/features/component-example';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Suspense
              fallback={
                <Skeleton className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center">
                  waiting 1s....
                </Skeleton>
              }
            >
              <ComponentExample delay={1000} />
            </Suspense>
            <Suspense
              fallback={
                <Skeleton className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center">
                  waiting 2s....
                </Skeleton>
              }
            >
              <ComponentExample delay={2000} />
            </Suspense>
            <Suspense
              fallback={
                <Skeleton className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center">
                  waiting 3s....
                </Skeleton>
              }
            >
              <ComponentExample delay={3000} />
            </Suspense>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const dynamic = 'force-dynamic';
