import Head from 'next/head'
import Layout, {siteTitle} from "../components/layout";
import utileStyles from '../styles/utils.module.css'
import getSortedPostsData from '../lib/posts'
import Date from "../components/date";
import Link from "next/link";

export async function getStaticProps() {
    const allPostData= getSortedPostsData()
    return {
        props:{
            allPostData
        }
    }
}

export default function Home({allPostData}) {
  return (
   <Layout home>
       <Head>
           <title>{siteTitle}</title>
       </Head>
       <section className={utileStyles.headingMd}>
           <p>Hello I'm a web and mobile developer !</p>
           <p>
               (This is a sample website - you’ll be building a site like this on{' '}
               <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
           </p>
       </section>
       <section className={`${utileStyles.headingMd} ${utileStyles.padding1px}`}>
           <h2 className={utileStyles.headingLg}>Blog</h2>
           <ul className={utileStyles.list}>
               {allPostData.map(({id,date,title})=>(
                   <li className={utileStyles.listItem} key={id}>
                       <Link href={`/posts/${id}`}>
                           <a>{title}</a>
                       </Link>
                       <br/>
                       <small className={utileStyles.lightText}>
                           <Date dateString={date} />
                       </small>
                   </li>
               ))}
           </ul>
       </section>
   </Layout>
  )
}
