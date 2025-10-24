import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { App } from "@shared/schema";
import { format } from "date-fns";

interface AppCardProps {
  app: App;
  onInstall?: (id: string) => void;
  onUpdate?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function AppCard({ app, onInstall, onUpdate, onRemove }: AppCardProps) {
  return (
    <Card
      className="flex flex-col items-center p-6 gap-4 hover-elevate transition-shadow duration-200"
      data-testid={`card-app-${app.id}`}
    >
      <div className="w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={app.iconUrl}
          alt={app.name}
          className="w-full h-full object-cover"
          data-testid={`img-app-icon-${app.id}`}
        />
      </div>

      <h2
        className="text-base font-medium text-center line-clamp-2 min-h-[44px] flex items-center"
        data-testid={`text-app-name-${app.id}`}
      >
        {app.name}
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {app.installed && (
          <Badge
            variant="secondary"
            className="text-xs px-3 py-1"
            data-testid={`badge-installed-${app.id}`}
          >
            已安裝
          </Badge>
        )}
        {app.version && (
          <Badge
            variant="outline"
            className="text-xs px-3 py-1"
            data-testid={`badge-version-${app.id}`}
          >
            v{app.version}
          </Badge>
        )}
        {app.isLatest && (
          <Badge
            variant="default"
            className="text-xs px-3 py-1"
            data-testid={`badge-latest-${app.id}`}
          >
            最新
          </Badge>
        )}
      </div>

      <p
        className="text-[13px] text-muted-foreground text-center"
        data-testid={`text-created-${app.id}`}
      >
        建立於 {format(new Date(app.createdAt), "yyyy-MM-dd HH:mm")}
      </p>

      <div className="flex gap-2 w-full mt-auto">
        {app.installed ? (
          <>
            {!app.isLatest && onUpdate && (
              <Button
                onClick={() => onUpdate(app.id)}
                className="flex-1"
                size="default"
                data-testid={`button-update-${app.id}`}
              >
                更新
              </Button>
            )}
            {onRemove && (
              <Button
                onClick={() => onRemove(app.id)}
                variant="outline"
                className="flex-1"
                size="default"
                data-testid={`button-remove-${app.id}`}
              >
                移除
              </Button>
            )}
          </>
        ) : (
          <>
            {onInstall && (
              <Button
                onClick={() => onInstall(app.id)}
                className="flex-1"
                size="default"
                data-testid={`button-install-${app.id}`}
              >
                安裝
              </Button>
            )}
            {onRemove && (
              <Button
                onClick={() => onRemove(app.id)}
                variant="outline"
                className="flex-1"
                size="default"
                data-testid={`button-remove-${app.id}`}
              >
                移除
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
