type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <div className="inner">
      <h1>Simple Memo App</h1>
      <main>{props.children}</main>
    </div>
  );
};
