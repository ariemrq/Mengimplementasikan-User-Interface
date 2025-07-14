function Layout({ children }) {
  return (
    <div>
      <main className="flex-1 p-6 w-full max-w-6xl mx-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default Layout;
