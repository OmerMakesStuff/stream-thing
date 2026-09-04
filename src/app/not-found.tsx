const NotFoundPage = () => (
  <div className='flex h-[calc(100vh-4rem)] flex-col items-center justify-center'>
    <h1 className='m-0 text-9xl leading-none font-extrabold tracking-tighter text-destructive sm:text-9xl md:text-[12rem] lg:text-[16rem]'>
      404
    </h1>
    <p className='mx-8 my-0 text-center text-base text-muted-foreground md:text-xl'>
      We&apos;re not sure what you were looking for, but it&apos;s not here.
    </p>
  </div>
);

export default NotFoundPage;
