
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur-sm py-8 mt-auto">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-lg font-semibold text-primary">
              FluxHR
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Streamline your employee onboarding process with our intuitive workflow solution.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
            <div className="text-center md:text-left">
              <h3 className="text-sm font-medium mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-sm font-medium mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {currentYear} FluxHR. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
