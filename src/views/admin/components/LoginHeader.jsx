import React from "react";
import { Lock } from "lucide-react";

/**
 * Header presentation for Login view
 */
export function LoginHeader({ brand }) {
  return (
    <div className="text-center space-y-2">
      {brand?.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-10 h-10 object-contain mx-auto rounded"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Lock className="w-5 h-5" />
        </div>
      )}
      <h1 className="text-lg font-bold tracking-tight text-foreground">
        Sign in to {brand?.name || "Admin Panel"}
      </h1>
      {brand?.subLabel && (
        <p className="text-xs text-muted-foreground">
          Enter your credentials to access the {brand.subLabel.toLowerCase()}
        </p>
      )}
    </div>
  );
}

export default LoginHeader;
