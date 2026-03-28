import styles from './arPerfumes.module.css';

type PageIntroProps = {
  title: string;
  description: string;
};

export default function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className={styles.pageIntro}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageLead}>{description}</p>
      </div>
    </section>
  );
}
