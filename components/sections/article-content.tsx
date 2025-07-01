import type { Article } from "@/types/content"

// <div
//   className="md:py-6 md:px-40 w-[calc(100vw-500px)] xl:w-[calc(100vw-300px)] lg:ml-[200px] lg:mr-[0px] xl:mr-[200px]"
//   style={{
//     margin: "0 auto",
//     background: "red",
//     marginTop: "60px",
//     paddingBottom: "400px",
//   }}
// >
interface ArticleContentProps {
  article: Article
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div
      className="
          md:py-6 md:px-40 lg:w-[calc(100vw-300px)] xl:w-[calc(100vw-500px)] 
          mt-[60px] lg:mr-0 lg:mb-0 lg:ml-auto
          xl:mr-[200px]
          lg:px-20 xl:px-40
    "
      style={{

        // background: "red",
        paddingBottom: "400px",
      }}
    >
      {/* Breadcrumb */}
      < nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8" >
        {
          article.breadcrumb.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <span>/</span>}
              <span className={index === article.breadcrumb.length - 1 ? "text-gray-900 font-medium" : ""}>{crumb}</span>
            </div>
          ))
        }
      </nav >

      {/* Article Title */}
      < div id="getting-started" className="scroll-mt-24 mb-8" >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {article.title}
          </span>
        </h1>
      </div >

      {/* Article Content */}
      < div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div >
  )
}
