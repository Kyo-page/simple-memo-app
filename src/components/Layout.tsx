import { Card } from "./ui/card";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
    return (
        <>
            <div className="px-8 py-12 bg-neutral-100">
                <h1 className="text-3xl font-bold mb-8">Simple Memo App</h1>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <main className="space-y-6 lg:col-span-2">{props.children}</main>
                    <aside className="order-first lg:order-last">
                        <Card>
                            <iframe
                                id="pomofocus"
                                title="Pomofocus"
                                width="100%"
                                height="480"
                                src="https://pomodor.app/timer"
                            ></iframe>
                        </Card>
                    </aside>
                </div>
                <footer className="py-8">
                    <p>
                        Created by{" "}
                        <a className="text-primary" href="https://github.com/Kyo-page" target="_blank" rel="noreferrer">
                            @Kyo
                        </a>{" "}
                        &copy; {new Date().getFullYear()}
                    </p>
                </footer>
            </div>
        </>
    );
};
