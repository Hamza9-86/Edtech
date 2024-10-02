export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${ 
        outline ? "border border-lightblue-300 bg-transparent" : "bg-lightblue-300"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-lightblue-300"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}