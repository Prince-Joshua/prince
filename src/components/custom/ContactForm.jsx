import { tokens } from "@/utils/tokens";
import { Box, Field, Input, Spinner, Textarea, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toaster } from "../ui/toaster";

const inputStyles = {
  variant: "unstyled",
  bg: "brand.surface2",
  border: "1px solid",
  borderColor: "brand.border",
  color: "brand.text",
  fontFamily: "mono",
  fontSize: "13px",
  px: "16px",
  py: "12px",
  borderRadius: "0",
  _placeholder: { color: "brand.muted" },
  _focus: {
    outline: "none",
    borderColor: "brand.accent",
    boxShadow: "none",
  },
  transition: "border-color 0.2s",
};

const errorAnim = {
  initial: { opacity: 0, y: -4, height: 0 },
  animate: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: -4, height: 0 },
  transition: {
    opacity: { duration: 0.2, ease: "easeInOut" },
    height: { duration: 0.3, ease: "easeInOut" },
  },
};

const MotionBox = motion.create(Box);
const MotionErrorText = motion.create(Field.ErrorText);

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [lastSent, setLastSent] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const scrollToFirstError = () => {
    const el = document.querySelector("[aria-invalid='true']");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus({ preventScroll: true });
    }
  };

  const onSubmit = async (data) => {
    console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    const now = Date.now();
    if (now - lastSent < 30000) {
      toaster.create({
        title: "Slow down!",
        description: "Please wait 30 seconds before sending again.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (data.website) return;
    if (Object.keys(errors).length > 0) {
      scrollToFirstError();
      return;
    }
    setIsSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name.trim(),
          email: data.email.trim(),
          subject: data.subject.trim(),
          message: data.message.trim(),
          sent_date: new Date().toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      );

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REPLY,
        {
          name: data.name.trim(),
          email: data.email.trim(),
          subject: data.subject.trim(),
          message: data.message.trim(),
          sent_date: new Date().toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      );

      toaster.create({
        title: "Message sent!",
        description: "I'll get back to you soon.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      reset();
      setLastSent(now);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error(err);
      toaster.create({
        title: "Failed to send message",
        description: "Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSending(false);
    }
  };

  const fields = [
    {
      id: "name",
      placeholder: "Your Name",
      type: "input",
      rules: { required: "Name is required" },
    },
    {
      id: "email",
      placeholder: "Your Email",
      type: "input",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      },
    },
    {
      id: "subject",
      placeholder: "Subject",
      type: "input",
      rules: { required: "Subject is required" },
    },
    {
      id: "message",
      placeholder: "Your Message",
      type: "textarea",
      rules: { required: "Message is required" },
    },
  ];

  return (
    <MotionBox
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <VStack gap="2px" align="stretch">
        {fields.map(({ id, placeholder, type, rules }) => (
          <Field.Root key={id} invalid={!!errors[id]}>
            {type === "textarea" ? (
              <Textarea
                id={id}
                placeholder={placeholder}
                rows={5}
                resize="none"
                {...inputStyles}
                h="auto"
                {...register(id, rules)}
              />
            ) : (
              <Input
                id={id}
                placeholder={placeholder}
                {...inputStyles}
                h="48px"
                {...register(id, rules)}
              />
            )}
            <AnimatePresence mode="wait">
              {errors[id] && (
                <MotionErrorText
                  layout
                  fontSize="11px"
                  color="brand.accent3"
                  fontFamily="mono"
                  {...errorAnim}
                >
                  {errors[id].message}
                </MotionErrorText>
              )}
            </AnimatePresence>
          </Field.Root>
        ))}

        {/* Honeypot */}
        <Input
          type="text"
          placeholder="Your website"
          style={{ display: "none" }}
          {...register("website")}
        />

        {/* Submit */}
        <Box
          as="button"
          type="submit"
          disabled={isSending}
          mt="4px"
          px="28px"
          py="14px"
          bg={tokens.accent}
          color={tokens.bg}
          fontFamily="heading"
          fontWeight="700"
          fontSize="11px"
          letterSpacing="0.15em"
          textTransform="uppercase"
          border="none"
          cursor={isSending ? "not-allowed" : "pointer"}
          opacity={isSending ? 0.7 : 1}
          transition="opacity 0.2s"
          _hover={{ opacity: isSending ? 0.7 : 0.85 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="8px"
          w="full"
        >
          {isSending ? (
            <>
              <Spinner size="sm" /> Sending…
            </>
          ) : (
            "Send Message →"
          )}
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default ContactForm;
