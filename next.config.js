/** @type {import('next').NextConfig} */
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/app/:path*",
      },
    ];
  };
  return {
    reactStrictMode: true,
    rewrites

  }
}
