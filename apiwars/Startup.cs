using System.Reflection;
using apiwars.Context;
using apiwars.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace apiwars
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var migrationAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddDbContext<ApiwarsContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnectionString"),
                    sql => sql.MigrationsAssembly(migrationAssembly));
            });

            services.AddIdentity<IdentityUser, IdentityRole>(options => { options.User.RequireUniqueEmail = true; })
                .AddEntityFrameworkStores<ApiwarsContext>()
                .AddDefaultTokenProviders();

            services.AddControllersWithViews();
            services.AddTransient<IPlanetVoteRepository, PlanetVoteRepository>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            // {
            //     var context = serviceScope.ServiceProvider.GetService<ApiwarsContext>();
            //     context.Database.Migrate();
            // }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}