import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AudioProvider } from './context/AudioContext';
import { PageTransitionProvider } from './context/PageTransitionContext';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { Toast } from './components/ui/Toast';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { CherryBlossomCanvas } from './components/ui/CherryBlossomCanvas';
import { CinematicIntro } from './components/intro/CinematicIntro';

// Lazy loaded route views for optimal bundle splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Store = lazy(() => import('./pages/Store').then(m => ({ default: m.Store })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const Community = lazy(() => import('./pages/Community').then(m => ({ default: m.Community })));
const Rules = lazy(() => import('./pages/Rules').then(m => ({ default: m.Rules })));
const Support = lazy(() => import('./pages/Support').then(m => ({ default: m.Support })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const ModelVerificationGallery = lazy(() => import('./components/entities/ModelVerificationGallery').then(m => ({ default: m.ModelVerificationGallery })));
import { ErrorBoundary } from './components/ui/ErrorBoundary';

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#080a0f]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-2 border-emerald-500/30 border-t-[#80ff20] rounded-full animate-spin" />
      <span className="font-pixel text-[11px] tracking-widest text-[#80ff20] uppercase mc-shadow">
        LOVE PIXEL
      </span>
    </div>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <PageTransitionProvider>
        <AudioProvider>
          <CurrencyProvider>
            <CartProvider>
            <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col font-minecraft selection:bg-emerald-500/30 selection:text-white">
              <SmoothScroll />
              <CinematicIntro />
              <CherryBlossomCanvas />
              <Navbar />
              <main className="flex-1">
                <ErrorBoundary>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/store/:category" element={<Store />} />
                      <Route path="/product/:slug" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/rules" element={<Rules />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/dev/verify" element={<ModelVerificationGallery />} />
                      {/* Minecraft-themed 404 Chunk Not Found route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>
              <Footer />
              <Toast />
            </div>
          </CartProvider>
          </CurrencyProvider>
        </AudioProvider>
      </PageTransitionProvider>
    </BrowserRouter>
  );
}

export default App;
