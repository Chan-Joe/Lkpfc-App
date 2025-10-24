import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppCard } from "@/components/AppCard";
import type { App } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const { data: apps, isLoading, error } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });

  const handleBack = () => {
    window.history.back();
  };

  const handleInstall = (id: string) => {
    toast({
      title: "安裝應用程式",
      description: "此功能僅供展示用途",
    });
  };

  const handleUpdate = (id: string) => {
    toast({
      title: "更新應用程式",
      description: "此功能僅供展示用途",
    });
  };

  const handleRemove = (id: string) => {
    toast({
      title: "移除應用程式",
      description: "此功能僅供展示用途",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="mr-4"
            data-testid="button-back"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">返回</span>
          </Button>
          <h1 className="text-2xl font-medium" data-testid="text-page-title">
            應用程式
          </h1>
        </div>
      </header>

      <main className="container max-w-7xl px-4 py-8 md:px-6">
        {error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div>
              <p className="text-lg font-medium text-foreground" data-testid="text-error-title">
                載入失敗
              </p>
              <p className="text-muted-foreground mt-1" data-testid="text-error-message">
                無法載入應用程式列表，請稍後再試
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="flex flex-col items-center p-6 gap-4">
                <Skeleton className="w-[100px] h-[100px] rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
              </Card>
            ))}
          </div>
        ) : apps && apps.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {apps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onInstall={handleInstall}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground" data-testid="text-empty-state">
              沒有可用的應用程式
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
