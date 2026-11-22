
"use client";

type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 30%, #241035, #090610 65%)",
          color: "#f7f2ff",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "24px",
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: "480px",
            padding: "40px",
            textAlign: "center",
            background: "rgba(23, 15, 37, 0.85)",
            border: "1px solid rgba(196, 151, 255, 0.2)",
            borderRadius: "24px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 800,
              marginBottom: "32px",
            }}
          >
            Solve
            <span style={{ color: "#c59cff" }}>
              Oi
            </span>
          </div>

          <h1
            style={{
              fontSize: "30px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "#b9abc9",
              lineHeight: 1.7,
              marginBottom: "28px",
            }}
          >
            We encountered an unexpected problem.
            Please try again.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: "#f0e5ff",
              color: "#170c26",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>

          {error.digest && (
            <p
              style={{
                marginTop: "24px",
                fontSize: "11px",
                color: "#857595",
              }}
            >
              Error reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
